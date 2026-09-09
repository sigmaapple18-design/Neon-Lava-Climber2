document.addEventListener('DOMContentLoaded', () => {
        const play = document.getElementById('play');
    const menu = document.getElementById('Menu');
    const game = document.getElementById('gameCanvas');
    if (play && menu && game) {
    play.addEventListener('click', () => {

        menu.classList.add('hidden');

        game.classList.remove('hidden');

        if (typeof startGame === 'function') {
            startGame();
            console.log("Game loaded")
        } else {
            console.log("Game fucntion not found")
        }
    
});
    }
});
    function intro(){
        window.alert('Hello😊, WASD / Arrow keys to move, and dont try to be slow, cause every second the lava rises up. This is basicly a endless platformer. Improve your score and become one of the BEST. 1st isnt givin, its taken. This is the end of the intro😊 have fun.');
}
    function AsencionInfo(){
        window.alert('If you see this you have unlocked Asencion mode or idk,  its baisclly 2X multiplier but its a lil harder.');
}
