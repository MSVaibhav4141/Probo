interface IIcons{
    w?:string,
    h?:string ,
    className?:string,
    stroke?:string
}

export const CirciledPlusIcon = ({w,h, className, stroke}: IIcons) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox={`0 0 ${w || '24'} ${h|| '24'}`} strokeWidth={stroke || '1.5'} stroke="currentColor" className={`size-6 ${className}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
)