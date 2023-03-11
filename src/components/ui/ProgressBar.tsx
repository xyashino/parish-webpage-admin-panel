interface Props {
    value:number
}

export const ProgressBar =({value}:Props)=>{
    return <progress className="progress w-56" value={value} max="100"></progress>
}