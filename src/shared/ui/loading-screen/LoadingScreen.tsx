import FilmCameraLoader from './film-camera-loader/FilmCameraLoader';
import './LoadingScreen.css';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <FilmCameraLoader />
      <p className="loading-screen__text">
        <span>Выставляем выдержку...</span><br />
        <span>Настраиваем диафрагму...</span>
      </p>
    </div>
  );
}

export default LoadingScreen;
