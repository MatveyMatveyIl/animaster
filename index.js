addListeners();

function addListeners() {
    let heartBeating;
    let moveAndHide;
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });

    document.getElementById('fadeInReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().resetFadeIn(block);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('moveReset')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().resetMoveAndScale(block);
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });

    document.getElementById('scaleReset')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().resetMoveAndScale(block);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 1000, 1.25);
        });

    document.getElementById('fadeOutReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().resetFadeOut(block);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            moveAndHide = animaster().moveAndHide(block, 1000, {x: 100, y: 20});
        });

    document.getElementById('moveAndHideReset')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            moveAndHide.reset(block);
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 1000);
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            heartBeating = animaster().heartBeating(block, 1000, 1.4, 1);
        });

    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            heartBeating.stop();
        });
}

function animaster() {
    return {
        fadeIn: function (element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
        },
        move: function (element, duration, translation) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);
        },
        scale: function (element, duration, ratio) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
        },
        fadeOut: function (element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('show');
            element.classList.add('hide');
        },
        moveAndHide: function (element, duration, translation) {
            this.move(element, duration * 2 / 5, translation);
            setTimeout(() => this.fadeOut(element, duration * 3 / 5), duration * 2 / 5);
            return {
                reset: (element) => {
                    this.resetMoveAndScale(element);
                    this.resetFadeOut(element);
                }
            }
        },
        showAndHide: function (element, duration) {
            this.fadeIn(element, duration);
            setTimeout(() => this.fadeOut(element, duration), duration / 3);
        },
        heartBeating: function (element, duration, scaleUp, scaleDown) {
            let interval = setInterval(() => {
                this.scale(element, duration / 2, scaleUp);
                setTimeout(() => this.scale(element, duration / 2, scaleDown), duration / 2);
            }, 1000)

            return {
                interval,
                stop() {
                    clearTimeout(this.interval);
                }
            }
        },
        resetFadeIn: function (element) {
            element.style.transitionDuration = null;
            element.classList.remove('show');
            element.classList.add('hide');
        },
        resetFadeOut: function (element) {
            element.style.transitionDuration = null;
            element.classList.remove('hide');
            element.classList.add('show');
        },
        resetMoveAndScale: function (element) {
            element.style.transitionDuration = null;
            element.style.transform = null;
        }

    }
}

// /**
//  * Блок плавно появляется из прозрачного.
//  * @param element — HTMLElement, который надо анимировать
//  * @param duration — Продолжительность анимации в миллисекундах
//  */
// function fadeIn(element, duration) {
//     element.style.transitionDuration = `${duration}ms`;
//     element.classList.remove('hide');
//     element.classList.add('show');
// }
//
// /**
//  * Функция, передвигающая элемент
//  * @param element — HTMLElement, который надо анимировать
//  * @param duration — Продолжительность анимации в миллисекундах
//  * @param translation — объект с полями x и y, обозначающими смещение блока
//  */
// function move(element, duration, translation) {
//     element.style.transitionDuration = `${duration}ms`;
//     element.style.transform = getTransform(translation, null);
// }
//
// /**
//  * Функция, увеличивающая/уменьшающая элемент
//  * @param element — HTMLElement, который надо анимировать
//  * @param duration — Продолжительность анимации в миллисекундах
//  * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
//  */
// function scale(element, duration, ratio) {
//     element.style.transitionDuration = `${duration}ms`;
//     element.style.transform = getTransform(null, ratio);
// }

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}
