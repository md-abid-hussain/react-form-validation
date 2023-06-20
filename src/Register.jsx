import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// RegEx for validation
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/



const Register = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
    }, [pwd])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd, matchPwd])

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errMsg" : "offScreen"} aria-live='assertive'>{errMsg}</p>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={!validName || user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="text"
                    id="username"
                    value={user}
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-required='true'
                    aria-invalid={validName ? 'false' : 'true'}
                    aria-describedby='udinote'
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="udinote" className={userFocus && user && !validName ? "instructions" : "offScreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must be 4-24 characters long<br />
                    Must begin with a letter<br />
                    letter, number, hyphens,underscores are allowed
                </p>
                <label htmlFor='password'>Password:
                    <span className={validPwd ? "valid" : "invalid"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={!validPwd || pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="password"
                    id="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby='pwdnote'
                    aria-required="true"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instruction" : "offScreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must be between 8-24 digit long<br />
                    Atleast contains uppercase and lowercase letter, number and special character<br />
                    Allowed special characters are <span aria-label="exclamation mark">!</span>, <span aria-label="at symbol">@</span>, <span aria-label="hashtag">#</span> and <span aria-label="dollar sign">$</span>
                </p>
                <label htmlFor='confirm_pwd'>
                    Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={!validMatch || matchPwd ? "hide" : "invlid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    id="confirm_pwd"
                    type="password"
                    value={matchPwd}
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-required="true"
                    aria-describedby='matchnote'
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="matchnote" className={matchFocus && matchPwd && !validMatch ? "instructions" : "offScreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the password input field
                </p>
                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
            </form>
            <p>Already register?
                <span className="line">
                    <a href="#">Sign In</a>
                </span>
            </p>
        </section>
    )
}

export default Register