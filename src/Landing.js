import Button from 'react-bootstrap/Button';
import { TypeAnimation } from 'react-type-animation';

function Landing() {
    return (
        <div className="App">
            <div className="App-wrapper">
                <div className='row'></div>

                <div className='corner-frame'>
                    <TypeAnimation 
                        sequence={[
                            'Throw a dart at the map.', // Types 'One'
                            3000, // Waits 1s
                            'See where it takes you.', // Deletes 'One' and types 'Two'
                            2000, // Waits 2s
                            () => {
                                
                            }
                        ]}
                        wrapper="div"
                        cursor={true}
                        repeat={Infinity}
                        style={{ fontSize: '1em' }}
                    />
                </div>
                {/* <h3 className='corner-frame'>
                    Throw a dart at the map
                </h3> */}
                <a href="/throw" ><Button className="bn632-hover bn28" variant='light'>Try Dartboard</Button></a>
            </div>


        </div>
    );
}

export default Landing;





