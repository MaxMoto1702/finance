package finance

class UrlMappings {

    static mappings = {
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        delete "/$controller/$id(.$format)?"(action:"delete")
//        patch "/$controller/$id(.$format)?"(action:"patch")

        post "/$controller/$id/$action(.$format)?"()

        "/"(view: '/index')
        "/ex1"(view: '/ex1')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
