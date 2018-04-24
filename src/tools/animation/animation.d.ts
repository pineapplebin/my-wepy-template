import { Animation } from '../../typings/wx'
import wepy from '../../typings/wepy'

declare interface Director {
  animation: Animation
  component: wepy.component

  plan (target: string, fn: (animation: Animation) => void): Director

  command (fn: (animation: Animation) => void): object

  action (options: {
    wait: number
  }): Promise
}

declare type animation = {
  getDirector (): Director
}
