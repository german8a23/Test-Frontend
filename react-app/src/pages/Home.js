import React, { useEffect, useState } from 'react';
import '../componentes/home.scss';

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const [asciiArt, setAsciiArt] = useState('');
  const text = "¡Bienvenido al administrador del mini mercado.!";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substr(0, currentIndex + 1));
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const frames = [
      `
    ████████╗░█████╗░░██████╗░██████╗░
    ╚══██╔══╝██╔══██╗██╔════╝░██╔══██╗
    ░░░██║░░░██║░░██║██║░░██╗░██████╔╝
    ░░░██║░░░██║░░██║██║░░╚██╗██╔═══╝░
    ░░░██║░░░╚█████╔╝╚██████╔╝██║░░░░░
    ░░░╚═╝░░░░╚════╝░░╚═════╝░╚═╝░░░░░
    `,
      `
    ░██████╗░██████╗░░█████╗░░██████╗░
    ██╔════╝░██╔══██╗██╔══██╗██╔════╝░
    ██║░░██╗░██████╔╝███████║██║░░██╗░
    ██║░░╚██╗██╔═══╝░██╔══██║██║░░╚██╗
    ╚██████╔╝██║░░░░░██║░░██║╚██████╔╝
    ░╚═════╝░╚═╝░░░░░╚═╝░░╚═╝░╚═════╝░
    `,
      `
      ████████╗░█████╗░░██████╗░██████╗░
      ╚══██╔══╝██╔══██╗██╔════╝░██╔══██╗
      ░░░██║░░░██║░░██║██║░░██╗░██████╔╝
      ░░░██║░░░██║░░██║██║░░╚██╗██╔═══╝░
      ░░░██║░░░╚█████╔╝╚██████╔╝██║░░░░░
      ░░░╚═╝░░░░╚════╝░░╚═════╝░╚═╝░░░░░
      `,
        `
    ░██████╗░██████╗░░█████╗░░██████╗░
    ██╔════╝░██╔══██╗██╔══██╗██╔════╝░
    ██║░░██╗░██████╔╝███████║██║░░██╗░
    ██║░░╚██╗██╔═══╝░██╔══██║██║░░╚██╗
    ╚██████╔╝██║░░░░░██║░░██║╚██████╔╝
    ░╚═════╝░╚═╝░░░░░╚═╝░░╚═╝░╚═════╝░
    `,
    ];

    let currentFrameIndex = 0;
    const interval = setInterval(() => {
      setAsciiArt(frames[currentFrameIndex]);
      currentFrameIndex = (currentFrameIndex + 1) % frames.length;
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="home-container">
      <pre className="ascii-art">{asciiArt}</pre>
      <p className="display-text">{displayText}</p>
      <p className="hacker-quote">
       Being a hacker is a guarantee of survival... It is more than a crime.
      </p>
    </div>
  );
};

export default Home;














// import React, { useEffect, useState } from 'react';
// import '../componentes/home.scss';

// const Home = () => {
//   const [displayText, setDisplayText] = useState('');
//   const [asciiArt, setAsciiArt] = useState('');
//   const text = "¡Bienvenido al administrador del mini mercado.!";

//   useEffect(() => {
//     let currentIndex = 0;
//     const interval = setInterval(() => {
//       if (currentIndex < text.length) {
//         setDisplayText(text.substr(0, currentIndex + 1));
//         currentIndex++;
//       } else {
//         currentIndex = 0;
//       }
//     }, 100);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   useEffect(() => {
//     const asciiArt = `
//   ██████╗ ██████╗ ███████╗███████╗████████╗██╗   ██╗
//   ██╔══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝╚██╗ ██╔╝
//   ██████╔╝██████╔╝███████╗███████╗   ██║    ╚████╔╝ 
//   ██╔══██╗██╔═══╝ ╚════██║╚════██║   ██║     ╚██╔╝  
//   ██║  ██║██║     ███████║███████║   ██║      ██║   
//   ╚═╝  ╚═╝╚═╝     ╚══════╝╚══════╝   ╚═╝      ╚═╝   
//     `;

//     setAsciiArt(asciiArt);
//   }, []);

//   return (
//     <div className="home-container">
//       <pre className="ascii-art">{asciiArt}</pre>
//       <p className="display-text">{displayText}</p>
//       <p className="hacker-quote">
//         Being a hacker is a guarantee of survival... It is more than a crime.
//       </p>
//     </div>
//   );
// };

// export default Home;














// import React, { useEffect, useState } from 'react';
// import '../componentes/home.scss';

// const Home = () => {
//   const [displayText, setDisplayText] = useState('');
//   const [asciiArt, setAsciiArt] = useState('');
//   const text = "¡Bienvenido al administrador del mini mercado.!";

//   useEffect(() => {
//     let currentIndex = 0;
//     const interval = setInterval(() => {
//       if (currentIndex < text.length) {
//         setDisplayText(text.substr(0, currentIndex + 1));
//         currentIndex++;
//       } else {
//         currentIndex = 0;
//       }
//     }, 100);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   useEffect(() => {
//     const asciiArt = `
//   ██████╗ ██████╗ ███████╗███████╗████████╗██╗   ██╗
//   ██╔══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝╚██╗ ██╔╝
//   ██████╔╝██████╔╝███████╗███████╗   ██║    ╚████╔╝ 
//   ██╔══██╗██╔═══╝ ╚════██║╚════██║   ██║     ╚██╔╝  
//   ██║  ██║██║     ███████║███████║   ██║      ██║   
//   ╚═╝  ╚═╝╚═╝     ╚══════╝╚══════╝   ╚═╝      ╚═╝   
//     `;

//     setAsciiArt(asciiArt);
//   }, []);

//   return (
//     <div className="home-container">
//       <pre className="ascii-art">{asciiArt}</pre>
//       <p className="display-text">{displayText}</p>
//     </div>
//   );
// };

// export default Home;






















// import React, { useEffect, useState } from 'react';
// import '../componentes/home.scss';

// const Home = () => {
//   const [displayText, setDisplayText] = useState('');
//   const text = "¡Bienvenido al administrador del mini mercado.!"; 

//   useEffect(() => {
//     let currentIndex = 0;
//     const interval = setInterval(() => {
//       if (currentIndex < text.length) {
//         setDisplayText(text.substr(0, currentIndex + 1));
//         currentIndex++;
//       } else {
//         currentIndex = 0;
//       }
//     }, 100);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className="home-container">
//       <p className="display-text">{displayText}</p>
//     </div>
//   );
// };

// export default Home;









