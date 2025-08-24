import type { ComponentPropsWithRef } from 'react';

type ButtonProps = ComponentPropsWithRef<'button'>;

export default function Button(props: ButtonProps) {
  console.log(props);
  return <button {...props}>{props.children}</button>;
}
