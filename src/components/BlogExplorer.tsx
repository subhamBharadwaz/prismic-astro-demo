import { useEffect, useState } from "react";
import * as prismic from "@prismicio/client";
import { demoPosts, formatDate, toPost, type Post } from "../lib/posts";

const repository = "blogetest";
const base = import.meta.env.BASE_URL;
const blogPath = `${base}blog`;

function postFromURL() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("post");
}

export default function BlogExplorer() {
  const [posts, setPosts] = useState<Post[]>(demoPosts);
  const [activeUid, setActiveUid] = useState<string | null>(postFromURL);
  const [isLoading, setIsLoading] = useState(true);
  const activePost = posts.find((post) => post.uid === activeUid);

  useEffect(() => {
    const client = prismic.createClient(repository);
    client
      .getAllByType("blog_post", { orderings: { field: "my.blog_post.date", direction: "desc" } })
      .then((documents) => {
        if (documents.length) setPosts(documents.map(toPost));
      })
      .catch(() => {
        // The locally included sample articles keep the demo useful before Prismic has content.
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const syncFromURL = () => setActiveUid(postFromURL());
    window.addEventListener("popstate", syncFromURL);
    return () => window.removeEventListener("popstate", syncFromURL);
  }, []);

  function openPost(event: React.MouseEvent<HTMLAnchorElement>, uid: string) {
    event.preventDefault();
    window.history.pushState({}, "", `${blogPath}?post=${encodeURIComponent(uid)}`);
    setActiveUid(uid);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closePost() {
    window.history.pushState({}, "", blogPath);
    setActiveUid(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (activeUid && !activePost && !isLoading) {
    return <section className="mx-auto max-w-3xl px-6 py-20"><p className="text-slate-600">That article could not be found.</p><a className="mt-6 inline-block text-moss underline" href={blogPath} onClick={(event) => { event.preventDefault(); closePost(); }}>Back to journal</a></section>;
  }

  if (activePost) {
    return <article className="mx-auto max-w-3xl px-6 pt-12">
      <button onClick={closePost} className="mb-12 text-sm font-semibold text-moss hover:text-ink">← All articles</button>
      <p className="mb-5 text-sm font-semibold tracking-[0.18em] text-moss uppercase">{activePost.category} · {formatDate(activePost.date)}</p>
      <h1 className="font-serif text-5xl leading-[1.05] text-ink sm:text-7xl">{activePost.title}</h1>
      <p className="mt-7 text-xl leading-8 text-slate-600">{activePost.excerpt}</p>
      <p className="mt-8 text-sm text-slate-500">By {activePost.author}</p>
      {activePost.image && <img className="my-12 aspect-[16/9] w-full rounded-2xl object-cover" src={activePost.image} alt={activePost.imageAlt} loading="eager" />}
      <div className="prose" dangerouslySetInnerHTML={{ __html: activePost.html }} />
    </article>;
  }

  return <section className="mx-auto max-w-6xl px-6 pt-12">
    <div className="max-w-2xl"><p className="text-sm font-semibold tracking-[0.18em] text-moss uppercase">The journal</p><h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">Notes worth keeping.</h1><p className="mt-6 text-xl leading-8 text-slate-600">Ideas about thoughtful work, creative practice, and making space for what matters.</p></div>
    <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => <a key={post.uid} href={`${blogPath}?post=${encodeURIComponent(post.uid)}`} onClick={(event) => openPost(event, post.uid)} className="group block">
        <img className="aspect-[4/3] w-full rounded-2xl object-cover" src={post.image} alt={post.imageAlt} loading="lazy" />
        <p className="mt-5 text-xs font-semibold tracking-[0.15em] text-moss uppercase">{post.category} · {formatDate(post.date)}</p>
        <h2 className="mt-3 font-serif text-3xl leading-tight group-hover:text-moss">{post.title}</h2>
        <p className="mt-3 leading-7 text-slate-600">{post.excerpt}</p>
      </a>)}
    </div>
    {isLoading && <p className="mt-10 text-sm text-slate-500">Loading the latest articles…</p>}
  </section>;
}
