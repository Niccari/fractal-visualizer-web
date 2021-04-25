import React from "react";

enum EventType {
  REFRESH = "refresh",
  RESUME_STOP = "resume_stop",
}

interface Props {
  isRunning: boolean;
  onClick: (eventType: EventType) => void;
}

const Menu: React.FC<Props> = ({ isRunning, onClick }: Props) => {
  return (
    <div>
      <button
        id="refresh"
        disabled={!isRunning}
        onClick={() => {
          onClick(EventType.REFRESH);
        }}
      >
        {"次の図形を見る"}
      </button>
      <button
        id="resume_stop"
        onClick={() => {
          onClick(EventType.RESUME_STOP);
        }}
      >
        {isRunning ? "とめる" : "うごかす"}
      </button>
    </div>
  );
};

export { Menu, EventType };
