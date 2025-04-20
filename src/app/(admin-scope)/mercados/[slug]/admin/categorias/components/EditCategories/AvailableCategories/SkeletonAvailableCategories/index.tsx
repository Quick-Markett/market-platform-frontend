import React from 'react'

export const SkeletonAvailableCategories: React.FC = () => {
  return (
    <div className="3xl:grid-cols-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 2xl:grid-cols-5">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          className="flex w-full animate-pulse items-center gap-3 rounded-md border border-l border-neutral-200 bg-white px-5 py-3.5"
          key={i}
        >
          <figure className="flex items-center justify-center rounded-xl bg-neutral-50 p-2.5">
            <div className="h-6 w-6 rounded bg-slate-200" />
          </figure>
          <article className="flex w-full flex-1 flex-col items-start gap-2">
            <div className="h-4 w-3/4 rounded-sm bg-slate-200" />
            <div className="h-3 w-1/2 rounded-sm bg-slate-100" />
          </article>
        </div>
      ))}
    </div>
  )
}
