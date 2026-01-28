type DeleteBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, size: 'btn-sm' | 'btn-lg', children: React.ReactNode }

function DeleteBtn(props: DeleteBtnProps) {

  return (
    <button
      type="button"
      className={`btn btn-error btn-dash w-full font-[play] uppercase ${ props.size }`}
      onClick={props.onClick}>
        {props.children}
    </button>
  )
}

export default DeleteBtn