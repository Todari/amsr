import { twMerge } from "tailwind-merge";

type TypographyProp = {
  text: string,
  className?: string,
  onClick?: ()=> void
}

export function TypographyH1({ text, className }: TypographyProp) {
  return (
    <h1 className={twMerge("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
      {text}
    </h1>
  )
}

export function TypographyH2({ text, className }: TypographyProp) {
  return (
    <h2 className={twMerge("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>
      {text}
    </h2>
  )
}

export function TypographyH3({ text, className }: TypographyProp) {
  return (
    <h3 className={twMerge("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
      {text}
    </h3>
  )
}

export function TypographyH4({ text, className }: TypographyProp) {
  return (
    <h4 className={twMerge("scroll-m-20 text-xl font-semibold tracking-tight", className)}>{text}</h4>
  )
}

export function TypographyP({ text, className }: TypographyProp) {
  return (
    <p className={twMerge("leading-7 [&:not(:first-child)]:mt-6", className)}>{text}</p>
  )
}

export function TypographyBlockquote({ text, className }: TypographyProp) {
  return (
    <blockquote className={twMerge("mt-6 border-l-2 pl-6 italic", className)}>{text}</blockquote>
  )
}

export function TypographyInlineCode({ text, className }: TypographyProp) {
  return (
    <code className={twMerge("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)}>{text}</code>
  )
}

export function TypographyLead({ text, className }: TypographyProp) {
  return (
    <p className={twMerge("text-xl text-muted-foreground", className)}>{text}</p>
  )
}

export function TypographyLarge({ text, className }: TypographyProp) {
  return <div className={twMerge("font-semibold", className)} >{text}</div>
}

export function TypographySmall({ text, className }: TypographyProp) {
  return (
    <small className={twMerge("text-sm font-medium leading-none", className)}>{text}</small>
  )
}

export function TypographyMuted({ text, className, onClick }: TypographyProp) {
  return (
    <p className={twMerge("text-sm text-muted-foreground", className)} onClick={onClick}>{text}</p>
  )
}

