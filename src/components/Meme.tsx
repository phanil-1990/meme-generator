import { useState, useEffect } from "react";

function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    });

    const [allMemes, setAllMemes] = useState([]);

    const [colorone, setColorTop] = useState('#ffffff');
    const [colortwo, setColorBottom] = useState('#ffffff');

    const [rotate, setRotate] = useState(0);
    const [mirror, setMirror] = useState(false);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then((data) => setAllMemes(data.data.memes));
    }, []);

    function getRandomImage() {
        const memeImg = allMemes[Math.floor(Math.random() * allMemes.length)];
        let url = memeImg.url;

        setMeme((prevMeme) => ({
            ...prevMeme,
            randomImage: url,
        }));
    }

    function handleImageChange(event) {
        setMeme((prevMeme) => ({
            ...prevMeme,
            randomImage: event.target.value,
        }));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme((prevMeme) => ({
            ...prevMeme,
            [name]: value,
        }));
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form-input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input onChange={(event) => { setColorTop(event.target.value) }} type="color" className="choose-color" />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form-input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <input onChange={(event) => { setColorBottom(event.target.value) }} type="color" className="choose-color" />

                <input
                    type="text"
                    placeholder="Image"
                    className="form-input"
                    name="imageUrl"
                    value={meme.randomImage}
                    onChange={handleImageChange}
                />

                <button className="form-button" onClick={getRandomImage}>
                    Get a new meme image
                </button>
            </div>

            <div className="meme">
                <img style={{ transform: `rotate(${rotate}deg) scaleX(${mirror ? 1 : -1}) scale(${scale})` }} src={meme.randomImage} className="meme-image" alt="meme" />
                <h2 style={{ color: colorone }} className="meme-text top">{meme.topText}</h2>
                <h2 style={{ color: colortwo }} className="meme-text bottom">{meme.bottomText}</h2>
            </div>
            <div className="functional-buttons">
                <button onClick={() => { const newrotate = rotate + 30; setRotate(newrotate); }} className="button button2">Rotate</button>
                <button onClick={() => { setMirror(!mirror); }} className="button button3">Mirror</button>
                <button onClick={() => { const newscale = scale + 0.1; setScale(newscale); }} className="button button4">Scale ++</button>
                <button onClick={() => { const newscale = scale - 0.1; setScale(newscale); }} className="button button4">Scale --</button>
            </div>
        </main>
    );
}

export default Meme;
