import React from "react";

enum EventType {
  ADD_SHAPE = "add_shape",
  EDIT_SHAPE = "edit_shape",
  EDIT_STYLE = "edit_style",
  MISC = "misc",
}

interface Props {
  onClick: (eventType: EventType) => void;
}

const Menu: React.FC<Props> = ({ onClick }: Props) => {
  return (
    <div>
      <button
        id="add_graph"
        onClick={() => {
          onClick(EventType.ADD_SHAPE);
        }}
      >
        {"図形を追加する"}
      </button>
      <button
        id="edit_graph"
        onClick={() => {
          onClick(EventType.EDIT_SHAPE);
        }}
      >
        {"図形を編集する"}
      </button>
      <button
        id="edit_style"
        onClick={() => {
          onClick(EventType.EDIT_STYLE);
        }}
      >
        {"見え方を変える"}
      </button>
      <button
        id="misc"
        onClick={() => {
          onClick(EventType.MISC);
        }}
      >
        {"設定"}
      </button>
    </div>
  );
};

export { Menu, EventType };
