"use client";

import { useState } from "react";

export function QuizFinder() {
  const [opened, setOpened] = useState(false);
  const [result, setResult] = useState("");
  return <section className="match-section section-wrap"><div className="match-blob"><div className="match-ball">🐕</div><span className="match-spark spark-left">✦</span><span className="match-spark spark-right">✿</span></div><div className="match-copy"><p className="eyebrow">A fun little sniff test</p><h2>Every dog has <em>a chew mood.</em></h2><p>Let’s find a just-for-fun starting point for your dog’s next treat-time moment.</p>{!opened ? <button className="button button-dark" type="button" onClick={() => setOpened(true)}>Find their chew match <span aria-hidden="true">→</span></button> : result ? <div className="quiz-result"><h3>A little {result} moment.</h3><p>Use this as a playful starting point. Always supervise and choose a size suited to your dog.</p><button className="text-link" type="button" onClick={() => { setOpened(false); setResult(""); }}>Start again ↻</button></div> : <div className="quiz-options"><p>What’s their chew mood?</p>{[["Beef Lung", "A little crunch"], ["Bully Stick", "Settle in and chew"], ["Cow Ear", "A new texture"]].map(([name, text]) => <button className="quiz-option" key={name} type="button" onClick={() => setResult(name)}>{text}</button>)}</div>}<small>Choose a treat that suits your dog. Always supervise chew time.</small></div><div className="match-sticker">WAG<br />MORE!</div></section>;
}
