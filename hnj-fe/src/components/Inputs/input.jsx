import style from './style.module.scss';

function Input({ prompt, prefix, suffix, value, onChange, type = 'text', ...rest}) {
    return (
        <div className={style.container}>
            {prefix && <div className={style.prefix}>{prefix}</div>}
            <input className={style.input} placeholder={prompt} value={value} onChange={onChange} type={type} {...rest}/>
            {suffix && <div className={style.suffix}>{suffix}</div>}
        </div>
    )
}

export default Input