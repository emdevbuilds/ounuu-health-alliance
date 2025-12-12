import type { Connection } from "mongoose";

export {};

declare global {
  type iconProps = {
    className?: string;
  };
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}
