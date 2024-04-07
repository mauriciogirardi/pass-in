import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type SkeletonProps = ComponentProps<'div'>

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      {...props}
      className={twMerge('bg-zinc-700 animate-pulse rounded', className)}
    />
  )
}
