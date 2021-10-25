const currentPage = location.pathname
const menuItems = document.querySelectorAll(" header .links a")

for (item of menuItems){
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}


function paginate(selectedPages , totalPages){

        let pages = [],
            oldPage

        for(let currentPage = 1; currentPage <= totalPages; currentPage++){
            
            const firstAndLastPage = currentPage == 1 || currentPage == totalPages
            const pagesAfterSelectedPage = currentPage <= selectedPage +2 
            const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

            if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage){
                
                if (oldPage && currentPage - oldPage > 2) {
                    pages.push("...")
                }
                if (oldPage && currentPage - oldPage == 2) {
                    pages.push(oldPage + 1)
                }

                pages.push(currentPage)

                oldPage = currentPage
            }
        }
    return pages    
}

const pagination = document.querySelector(".pagination")
const page = +pagination.dataset.pages;
const total = +pagination.dataset.total



// Unary Operator
// As with Concatenating an Empty String, there is also a 
// workaround that has better performance but lacks 
// readability.

// let str = '100';
// let fltStr = '100.21';
// let nanStr = 'greetings';

// +str    // 100
// +fltStr // 100.21
// +nanStr // NaN
// +'1000' // 1000
// +10.25  // 10.25
// While concise and effective, this isn't a very well-known feature of JavaScript, 
// so it's not advised to use since it may make your code not as easy to understand.