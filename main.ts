input.onButtonPressed(Button.A, function () {
    ALT += -1
    if (ALT < 0) {
        ALT = 0
    }
})
input.onButtonPressed(Button.AB, function () {
    for (let zap = 0; zap <= 4; zap++) {
        led.plot(zap, ALT)
    }
})
input.onButtonPressed(Button.B, function () {
    ALT += 1
    if (ALT > 4) {
        ALT = 4
    }
})
let shifted = 0
let height = 0
let ALT = 0
let lives = 5
let points = 0
let landscape: number[] = []
ALT = 0
for (let index = 0; index < 100; index++) {
    landscape.unshift(randint(0, 3))
}
basic.forever(function () {
    points += 1
    led.plotBrightness(0, ALT, 255)
    basic.pause(300)
    for (let index = 0; index <= 4; index++) {
        height = landscape[index]
        for (let index2 = 0; index2 <= 4; index2++) {
            if (index2 <= height) {
                led.plotBrightness(index, 4 - index2, 126)
                if (index == 0 && ALT == 4 - index2) {
                    lives += -1
                }
            } else {
                led.plotBrightness(index, 4 - index2, 0)
            }
        }
    }
    shifted = landscape.shift()
    landscape.push(shifted)
    if (lives <= 0) {
        game.setScore(points)
        basic.showIcon(IconNames.Sad)
        game.gameOver()
    }
})
