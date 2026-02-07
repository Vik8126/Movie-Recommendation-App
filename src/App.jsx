import { useState } from "react";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ top: "60%", left: "55%" });

  const moveNoButton = () => {
    const top = Math.random() * 70 + "%";
    const left = Math.random() * 70 + "%";
    setNoPos({ top, left });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {!accepted ? (
          <>
            <h1 style={styles.title}>Hey Beautiful ❤️</h1>
            <p style={styles.text}>
              I was thinking… a lot 😌 About your smile, your laugh, and how
              unfairly attractive you are.
              <br />
              <br />
              So tell me one thing 💕
              <strong>Will you be my Valentine?</strong> 😘
            </p>

            <div style={styles.buttonWrap}>
              <button style={styles.yesBtn} onClick={() => setAccepted(true)}>
                YES 😍
              </button>

              <button
                style={{ ...styles.noBtn, ...noPos }}
                onMouseEnter={moveNoButton}
              >
                NO 🙄
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 style={styles.title}>You said YES 💖</h1>
            <p style={styles.text}>
              I knew it 😏 Guess you’re officially stuck with me now.
              <br />
              <br />I Love You So Much Cheeku 😘💖🔥 And Cheeku Aapko or v
              suprise milega 14th Feb ko hihihihihihi , You are so special to me
              cheeku ji , I have never felted for anyone the way i feel about
              and I need You in my and soon as possible so that i don't have to
              miss you more i can tease you and love you hug you , I hope hum
              sath ho next valentine mai apko khi bhar restaurant pe le k jau
              and hum celebrate kare mast , hayyyyyyyy you are cute ,
              Muahhhhhhhhhhhhhhhhhhh 😘 , Apna khyal rakho , see you soon my love...
            </p>
            <div style={styles.heart}>❤️‍🔥❤️‍🔥❤️‍🔥</div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #ff0844, #ffb199)",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    position: "relative",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(14px)",
    padding: "40px",
    borderRadius: "20px",
    width: "360px",
    textAlign: "center",
    color: "#fff",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
    animation: "fadeIn 0.8s ease",
  },
  title: {
    fontSize: "28px",
    marginBottom: "15px",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  buttonWrap: {
    position: "relative",
    height: "120px",
  },
  yesBtn: {
    padding: "12px 30px",
    fontSize: "16px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    background: "#ff4d6d",
    color: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    transition: "transform 0.2s",
  },
  noBtn: {
    position: "absolute",
    padding: "10px 24px",
    fontSize: "14px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    background: "#222",
    color: "#fff",
    transition: "0.2s ease",
  },
  heart: {
    fontSize: "32px",
    animation: "pulse 1.2s infinite",
  },
};
