// 鼠标移动
const mb = document.getElementById('springBanner')
let intX
let imgs = document.querySelectorAll('.layer img')
console.log(imgs)
imgs = [...imgs]

let o_imgs_styles = imgs.map(el => {
    let s = window.getComputedStyle(el, null).getPropertyValue('transform')
    return `transform: ${s}`
})

let o_imgs_opacitys = imgs.map(el => {
    let o = window.getComputedStyle(el, null).getPropertyValue('opacity')
    return `opacity: ${0}`
})

function getTranslateVal(str) {
    let s = 'translate', e = ')'
    let si = str.indexOf(s)
    let ei
}

mb.onmouseenter = function ({ x }) {
    intX = x
}
mb.onmousemove = function ({ x }) {
    imgs.forEach((el, i) => {
        const dm = el.dataset.moveMultiple
        const dis = (intX - x) / Number(dm)
        const transform_arr = o_imgs_styles[i].split(',')
        let translate_x = Number(transform_arr[4])
        let new_translate_x = translate_x + dis
        transform_arr.splice(4, 1, String(new_translate_x))
        let transform_str = transform_arr.join(',')

        if (el.dataset.isOpacity) {
            const o_arr = o_imgs_opacitys[i].split(':')
            const o_value = Number(o_arr[1])
            let href_w = window.screen.width / 2

            const o_dis = Number(el.dataset.isOpacity) ? intX - x : x - intX

            let new_o_value = o_dis / href_w
            o_arr.splice(1, 1, new_o_value)
            let o_str = o_arr.join(':')
            transform_str += `; ${o_str}`
        }

        el.setAttribute('style', transform_str)
    })
}
mb.onmouseleave = function () {
    imgs.forEach((el, i) => {
        el.setAttribute('style', o_imgs_styles[i])
    })
}

// 樱花飘落canvas 
const c = document.getElementById('canvas')
const ctx = c.getContext('2d')
const _w = c.width, _h = c.height;
const scales = [0.03, 0.04, 0.05, 0.06, 0.07, 0.08];
const slen = scales.length - 1;
const speedX = 2, speedY = 3;
class flower {
    constructor() {
        this.x = Math.random() * _w;
        this.y = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.scale = 0;
        this.width = 0;
        this.height = 0;
        this.img = null
    }
    init() {
        this.img = new Image()
        const f = Math.random() * 10 > 5 ? 1 : 0
        const si = Math.floor(Math.random() * slen)
        this.speedX = Math.random() * speedX
        this.speedY = Math.random() * speedY
        this.scale = scales[si]
        this.width = this.height = 250 * this.scale
        const src = f ? "https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-img-a@main/BilibiliBannerSpring/flow1.png" : 'https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-img-a@main/BilibiliBannerSpring/flow2.png';
        this.img.src = src
    }
    draw(ctx) {
        this.img.onload = () => {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }
    move(ctx) {
        this.x = this.x + this.speedX >= _w ? Math.random() * _w : this.x + this.speedX;
        this.y = this.y >= _h ? 0 : this.y + this.speedY;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}
const flowers = []
function start() {
    const max = 50;
    for (let i = 0; i < max; i++) {
        const f = new flower()
        f.init()
        f.draw(ctx)
        flowers.push(f)
    }
}
function move() {
    ctx.clearRect(0, 0, _w, _h)
    for (let i = 0; i < flowers.length; i++) {
        flowers[i].move(ctx)
    }
    window.requestAnimationFrame(move)
}
start()
move()