
import ReactLoading, { LoadingProps, } from 'react-loading'


type Props = LoadingProps & {
  text?: string;
}

export const LoadingSection = ({ type, color, width, height, text = 'Loading...' }: Props) => {
  return (
    <div className='loading'>
      <ReactLoading type={ type }
        color={ color }
        width={ width }
        height={ height } />
      <h3 style={ { color } }>{ text }</h3>
    </div>
    
  );
}
