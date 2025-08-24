import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type SyntheticEvent,
} from 'react';

const inputStyles = {
  flex: 1,
  height: '50px',
  fontSize: '1.2rem',
};

type TimerProps = {
  defaultBackgroundColor?: string;
};

export default function Timer({
  defaultBackgroundColor = 'unset',
}: TimerProps) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const formattedSeconds = useMemo(
    () => `${seconds}`.padEnd(2, '0'),
    [seconds]
  );

  const [bodyBackgroundColor, setBodyBackgroundColor] = useState(
    defaultBackgroundColor
  );
  const [countdownColor, setCountdownColor] = useState('black');
  const [appState, setAppState] = useState<'idle' | 'counting' | 'finished'>(
    'idle'
  );

  const handleMinuteChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setMinutes(+e.currentTarget.value);
  };

  const handleSecondChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setSeconds(+e.currentTarget.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setAppState('counting');
  };

  const bodyClickHandler = (): void => {
    if (appState !== 'finished') {
      return;
    }

    setBodyBackgroundColor('unset');
    setCountdownColor('black');
    setAppState('idle');
  };

  useEffect(() => {
    if (appState === 'idle') {
      return;
    }

    if (appState === 'finished') {
      return;
    }

    let timeout = setTimeout(() => {
      if (seconds === 0 && minutes === 0) {
        setBodyBackgroundColor('red');
        setCountdownColor('white');
        setAppState('finished');
        return;
      }

      if (seconds > 0) {
        setSeconds((current) => current - 1);
        return;
      }

      if (seconds === 0) {
        setSeconds(59);
        setMinutes((current) => current - 1);
        return;
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [appState, seconds, minutes]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: bodyBackgroundColor,
      }}
      onClick={bodyClickHandler}
    >
      {appState === 'idle' ? (
        <form
          onSubmit={handleFormSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '50vw',
            rowGap: '16px',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: '16px',
            }}
          >
            <input
              value={minutes}
              type="number"
              placeholder="Minutes"
              min="0"
              onChange={handleMinuteChange}
              style={inputStyles}
            />

            <input
              type="number"
              placeholder="Seconds"
              min="0"
              max="59"
              value={seconds}
              onChange={handleSecondChange}
              style={inputStyles}
            />
          </div>

          <button
            type="submit"
            style={{
              height: '50px',
              fontSize: '1.2rem',
              width: '100%',
            }}
          >
            Start
          </button>
        </form>
      ) : (
        <h1
          id="countdown-display"
          style={{ fontSize: '12rem', display: 'flex', color: countdownColor }}
        >
          <span id="minutes-display">{minutes}</span>:
          <span id="seconds-display">{formattedSeconds}</span>
        </h1>
      )}
    </div>
  );
}
