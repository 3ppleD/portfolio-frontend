import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Intro from './Intro'
import About from './About'
import Experiences from './Experiences'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'
import LeftSider from './LeftSider'
import Loader from '../../components/Loader' // Ensure this path is correct

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call or some async operation
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader when operation is complete
    }, 2000); // Adjust this time as needed

    // Clean up function
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div style={{ display: loading ? 'none' : 'block' }}>
        <Header />
        <div className='bg-primary px-40 sm:px-5'>
          <Intro />
          <About />
          <Experiences/>
          <Projects/>
          <Contact/>
          <Footer/>
          <LeftSider/>
        </div>
      </div>
    </>
  )
}

export default Home