import React from "react";

interface TaskProps {
  data: any;
}

interface TaskState {
  data?: any;
  color?: string;
  titles?: string[];
  message?: string;
}

export default class Task extends React.Component<TaskProps, TaskState> {
  constructor(props: TaskProps) {
    super(props);
    this.state = {
      data: this.formatData(this.props.data),
      color: "",
      titles: [],
      message: "",
    };
  }

  formatData(raw: any): any {
    return Object.keys(raw)
      .map((key: any) => [
        {
          title: key,
          expected: raw[key],
        },
        {
          title: raw[key],
          expected: key,
        },
      ])
      .flat();
  }

  setSelected(item: any): any {
    if (this.state.titles?.length && this.state.color !== "red") {
      const data: any = {
        color: this.state.titles.includes(item.expected) ? "green" : "red",
        titles: [...this.state.titles, item.title],
        message: this.state.titles.includes(item.expected)
          ? "Congratulation!!!"
          : "Wrong Selection",
      };
      this.setState(data);
      const valid = this.state.titles.includes(item.expected);
      setTimeout(
        () =>
          this.setState({
            data: valid
              ? this.state.data.filter(
                  ({ title }: any) => !this.state.titles?.includes(title)
                )
              : this.state.data,
            color: "",
            titles: [],
            message: "",
          }),
        500
      );
    } else {
      this.setState({ color: "blue", titles: [item.title] });
    }
  }

  render() {
    return (
      <>
        {this.state.data.length ? (
          this.state.data.map((item: any) => (
            <button
              key={item.title}
              style={{
                backgroundColor: this.state.titles?.includes(item.title)
                  ? this.state.color
                  : "",
              }}
              disabled={!!this.state.message}
              onClick={() => this.setSelected(item)}
            >
              {item.title}
            </button>
          ))
        ) : (
          <div>No records to display</div>
        )}
        {this.state.message ? <div>{this.state.message}</div> : ""}
      </>
    );
  }
}
