import { Worker } from './worker';

export abstract class Service {
  protected _route!: string;
  private _worker!: Worker;
  // abstract onCreate(callback: (args: any) => void): void;
  // abstract onUpdate(callback: (args: any) => void): void;
  // abstract onDelete(callback: (args: any) => void): void;

  public setWorker(worker: Worker) {
    this._worker = worker;
  }

  protected get worker() {
    if (!this._worker) throw new Error('Worker is not initialized');
    return this._worker;
  }

  public get guild() {
    if (!this._worker) throw new Error('Worker is not initialized');
    return this.worker.guild;
  }
}
