import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const showAlert = (title, text, icon, showCancelButton, confirmButtonText, onConfirm) => {
    withReactContent(Swal).fire({
        title: title,
        text: text,
        icon: icon ? icon : 'success',
        showCancelButton: showCancelButton ? showCancelButton : true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmButtonText ? confirmButtonText : "Ok",
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm()
        }
    })
}

const showLoading = () => {
    withReactContent(Swal).fire({
        title: 'Loading',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
    })
}

const closeAlert = () => {
    withReactContent(Swal).close()
}

// export default showAlert
export { showAlert, showLoading, closeAlert }