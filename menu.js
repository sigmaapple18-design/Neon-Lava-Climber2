document.addEventListener('DOMContentLoaded', () => {
    const play = document.getElementById('play');
    const menu = document.getElementById('Menu');
    const game = document.getElementById('gameCanvas');
    const gameOver = document.getElementById('gameOverScreen');
    const playAgain = document.getElementById('playAgain');
    const mainMenu = document.getElementById('mainMenu');

    function beginGame() {
        menu.classList.add('hidden');
        game.classList.remove('hidden');
        gameOver.classList.add('hidden');

        if (typeof startGame === 'function') {
            startGame();
        }

    }

    if (play) play.addEventListener('click', beginGame);
    if (playAgain) playAgain.addEventListener('click', beginGame);
    if (mainMenu) {
        mainMenu.addEventListener('click', () => {
            gameOver.classList.add('hidden');
            game.classList.add('hidden');
            menu.classList.remove('hidden');
        });
    }
});
    function intro(){
        window.alert('Hello😊, WASD / Arrow keys to move, and dont try to be slow, cause every second the lava rises up. This is basicly a endless platformer. Improve your score and become one of the BEST. 1st isnt givin, its taken. This is the end of the intro😊 have fun.');
}
    function AsencionInfo(){
        window.alert('If you see this you have unlocked Asencion mode or idk,  its baisclly 2X multiplier but its a lil harder.');
}
