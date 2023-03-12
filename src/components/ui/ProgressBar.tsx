interface Props {
    value:number;
    description?:true;
}

export const ProgressBar =({value,description}:Props)=>{
    if(description) {
        return <div className='flex flex-col items-center'>
            <progress className="progress w-56" value={value} max="100"></progress>
            <p>{value === 100 ? 'Success !' : `${value} %`}</p>
        </div>

    }
    return <progress className="progress w-56" value={value} max="100"></progress>
}