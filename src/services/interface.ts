import { Worker } from './worker';

export abstract class Service {
  protected _route!: string;
  private _worker!: Worker;

  public setWorker(worker: Worker) {
    this._worker = worker;
    return this
  }

  protected get worker() {
    if (!this._worker) throw new Error('Worker is not initialized');
    return this._worker;
  }

  public get guild() {
    if (!this._worker) throw new Error('Worker is not initialized');
    return this.worker.guild;
  }

  public abstract clone(): Service
}
