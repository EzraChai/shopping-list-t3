import type { Dispatch, FC, SetStateAction } from "react";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import type { ShoppingItem } from "@prisma/client";

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<ShoppingItem[]>>;
}

export const ItemModal: FC<ItemModalProps> = ({ setModalOpen, setItems }) => {
  const [input, setInput] = useState<string>("");

  const addItemMutation = trpc.item.addItem.useMutation({
    onSuccess: (shoppingItem) => {
      setItems((prev) => [...prev, shoppingItem]);
      setInput(() => "");
      setModalOpen((ModalOpenState) => !ModalOpenState);
    },
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
      <div className="space-y-6 rounded-lg bg-white p-4">
        <h3 className="text-xl font-medium">Name of item</h3>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="w-full rounded-lg border border-zinc-800  p-4 py-2 focus:border-violet-400 focus:bg-white focus:ring"
        />
        {addItemMutation.error && (
          <div className="text-xs font-semibold text-red-600">
            {addItemMutation.error.message}
          </div>
        )}
        <div className="flex justify-end gap-3">
          {!addItemMutation.isLoading && (
            <button
              onClick={() => setModalOpen((ModalOpenState) => !ModalOpenState)}
              className="rounded-lg bg-zinc-600 p-2 text-sm font-semibold text-white transition hover:bg-zinc-500"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => {
              addItemMutation.mutate({ name: input });
            }}
            disabled={addItemMutation.isLoading}
            className="rounded-lg bg-violet-600 p-2 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            {addItemMutation.isLoading ? "Loading..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};
