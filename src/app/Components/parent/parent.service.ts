import { effect, Injectable, signal } from "@angular/core";
export interface HasOverflow {
    id: number | undefined;
    hasOverflow: boolean;
  }

@Injectable({
    providedIn: 'root'
})

export class ParentService {
    private readonly overflowStates = signal<HasOverflow[]>([]);

    getOverflowStates(): HasOverflow[] {
        return this.overflowStates();
    }

    setOverflowStates(newState: HasOverflow) {
        this.overflowStates.update((states) => {
            return [...states, newState];
        })
    }
}