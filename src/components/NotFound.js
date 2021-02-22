import React from 'react'

export default function NotFound() {
    return (
        <div className="flex-center-box">
            <div className="not-found-con">
                <img src="icons/notfound.svg"/>
               <div> We could not find weather information for the location above</div>
            </div>
        </div>
    )
}
