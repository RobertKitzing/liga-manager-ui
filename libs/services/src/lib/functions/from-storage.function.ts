import { effect, inject, signal, untracked, type WritableSignal } from '@angular/core';

import { StorageService } from '../services';

export const fromStorage = <TValue>(storageKey: string, defaultValue?: TValue): WritableSignal<TValue | null> => {
    const storage = inject(StorageService);

    const initialValue = defaultValue || storage.getItem<TValue>(storageKey);

    const fromStorageSignal = signal<TValue | null>(initialValue);

    effect(() => {
        const updated = fromStorageSignal();
        untracked(() => storage.setItem(storageKey, updated));
    });

    return fromStorageSignal;
};