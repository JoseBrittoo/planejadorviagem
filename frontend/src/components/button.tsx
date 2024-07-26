import { tv, VariantProps } from 'tailwind-variants'
import { ComponentProps, ReactNode } from "react";

const buttonVariants = tv({
    base: 'rounded-lg px-5 py-2 font-medium flex items-center gap-2 justify-center',

    variants: {
        variant: {
            primary:'bg-orange-500 text-blue-100  hover:bg-orange-950',
            secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
        },

        size: {
            default: 'py-2',
            full: 'w-full h-11',
        }
    }
})

// extende todas as propriedades do button
interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants>{
    children: ReactNode
    variant: "primary" | "secondary"
}

export function Button( {children, variant, size,  ...props} : ButtonProps) {
  return (
    <button {...props} className={buttonVariants({ variant, size })}>
        {children}
    </button>
  );
}
