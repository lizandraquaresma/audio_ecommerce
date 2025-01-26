import './Auth.css'

function App() {
  return (
    <>
      <h1>Audio</h1>
      <p>It's modular and designed to last</p>
      <textarea name="email" className='authArea' id="email"></textarea>
      <textarea name="password" className='authArea' id="pass"></textarea>
      <a href="">Forgot Password</a>
      <div className="card">
        <button onClick={() => console.log('clicked')}>
          Sign in
        </button>
      </div>
      <p>Didn’t have any account? <a href="SignUp.tsx" target="_self">
          Sign Up here</a></p>
      
    </>
  )
}

export default App
