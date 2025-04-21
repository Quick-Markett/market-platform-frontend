import React from 'react'

export const SkeletonAvailableProducts: React.FC = () => {
  return (
    <div className="grid h-auto w-full max-w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 2xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          className="flex h-full w-full max-w-[350px] animate-pulse flex-col gap-6 rounded-sm border border-neutral-300 bg-white px-4 pb-6 pt-4"
          key={index}
        >
          <figure className="flex w-full items-center justify-center rounded-sm bg-neutral-100 lg:h-[150px] xl:h-[180px]">
            <div className="h-full w-full bg-slate-200" />
          </figure>
          <article className="flex w-full flex-col gap-2">
            <div className="h-4 w-1/4 rounded-sm bg-slate-200" />
            <div className="h-5 w-3/4 rounded-sm bg-slate-300" />
            <div className="h-3 w-full rounded-sm bg-slate-100" />
            <div className="h-3 w-5/6 rounded-sm bg-slate-100" />
            <div className="mt-2 h-9 w-full rounded bg-slate-200" />
          </article>
        </div>
      ))}
    </div>
  )
}
