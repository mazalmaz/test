document.addEventListener("DOMContentLoaded", function () {


    [].forEach.call(document.querySelectorAll('.phone'), function (input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });


    const modalPopUp = function () {
        let modal = document.querySelector(".modal");
        let open = document.querySelector(".open");
        let cancel = document.querySelector(".cancel");

        modal.addEventListener("click", function (e) {
            if (this === e.target) this.style.display = "none";
            document.body.style.overflow = "auto"
        });
        open.addEventListener("click", function () {
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"
        });
        cancel.addEventListener("click", function () {
            modal.style.display = "none";
            document.body.style.overflow = "auto"
        })

    }


    const inputRequired = function () {
        let required = document.querySelectorAll(".required");
        let sumbit = document.querySelector(".modal__sumbit")
        let arr = [];
        let filterArr = [];
        var mask = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        required.forEach((element, index) => {
            if (element.classList.contains("error")) {
                arr.splice(index, 1, false)
            }
        });
        required.forEach((el, index) => {
            el.addEventListener("input", function (e) {
                if (!el.value || (el.classList.contains("phone") && el.value.length < 17) || (el.classList.contains("email") && !mask.test(el.value))) {
                    el.classList.add("error");
                    arr.splice(index, 1, false)
                }
                else {
                    el.classList.remove("error");
                    arr.splice(index, 1, true)
                }

                filterArr = arr.filter(e => e == false);

                if (!filterArr.length) {
                    sumbit.classList.remove("disabled");
                    sumbit.removeAttribute("disabled");
                } else {
                    sumbit.classList.add("disabled");
                    sumbit.setAttribute("disabled", "disabled");
                }

            })
        })

    }


    const fileCheck = function () {
        let file = document.querySelector(".avatar__file"),
            avatar = document.querySelector(".avatar"),
            close = document.querySelector(".avatar__close");

        close.addEventListener("click", function () {
            file.value = null;
            close.style.display = "none";
            avatar.style.background = "none";

        })

        file.addEventListener("change", function (e) {
            let f = URL.createObjectURL(this.files[0]);
            avatar.style.background = "url(" + f + ") no-repeat";
            close.style.display = "block"
        })
    };

    const getApi = function () {
        fetch('https://you-digital.ru/works/posts')
            .then(response => {   
                if (response.ok) {
                    response.json().then(data => {
                        print(data)
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
            function print(data) {
                for(let i = 0; i<data.length;i++) {
                    let tr = `
                      <td>${data[i].userId}</td>
                      <td>${data[i].id}</td>
                      <td>${data[i].title}</td>
                      <td>${data[i].body}</td>                  
                    `;
                    document.querySelector(".table").innerHTML += tr;
                } 
            }
    }

    fileCheck();
    inputRequired();
    modalPopUp();
    getApi();

});
