import tools from './Tools'
import Scene2 from './Scene2'

export default class Scene1 {
    constructor() {
        this.$container = document.querySelector('#scene1')
        this.$title     = this.$container.querySelector('.title')
        this.$action    = this.$container.querySelector('.action')
        this.$start     = this.$container.querySelector('button')

        this.init()
    }

    init() {
        this.$container.style.display = 'block'

        tools.animationEvent(this.$action, 'AnimationEnd', () => {
            this.$action.classList.remove('fadeInUp')
            this.$action.classList.add('flash')
        })

        // 开始游戏
        this.$start.addEventListener('click', () => {
            new Scene2()
            // this.destroy()
        }, false)
    }

    destroy() {
        this.$container.remove()
    }
}