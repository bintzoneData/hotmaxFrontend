import style from './ms.module.css';

function MainSpinner() {
  return (
    <main className={style.main}>
      <div className={`${style.spinner} shadow-bsh08`}>
        <div className={style.FormSpinner}></div>
      </div>
    </main>
  );
}

export default MainSpinner;
