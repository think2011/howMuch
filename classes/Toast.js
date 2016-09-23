let toast = new class Toast {
    constructor() {
        this.defaults = {
            time: 3000
        }

        return (options, cb) => this.render(options, cb)
    }

    render(options, cb) {
        options = Object.assign(this.defaults, options)

        let div = document.createElement('div')

        div.classList.add('toast-container')
        div.classList.add('fadeInRight')
        div.classList.add('animated')
        div.innerHTML = options.content
        document.body.appendChild(div)

        setTimeout(() => {
            div.classList.remove('fadeInRight')
            div.classList.add('fadeOutRight')
            tools.animationEvent(div, 'AnimationEnd', () => div.remove())
            cb && cb()
        }, options.time)
    }
}
