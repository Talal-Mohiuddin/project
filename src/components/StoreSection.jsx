"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

const initialFunctions = [
  {
    id: 1,
    name: "Function 1",
    code: "// Function 1 code",
    isPublic: false,
  },
  {
    id: 2,
    name: "Function 2",
    code: "// Function 2 code",
    isPublic: true,
  },
  {
    id: 3,
    name: "Function 3",
    code: "// Function 3 code",
    isPublic: false,
  },
  {
    id: 4,
    name: "Function 4",
    code: "// Function 4 code",
    isPublic: true,
  },
];

export default function StoreSection() {
  const [functions, setFunctions] = useState(initialFunctions);
  const [showModal, setShowModal] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [functionName, setFunctionName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [editorValue, setEditorValue] = useState("");

  // Commented out API call for fetching user functions
  // const fetchUserFunctions = async () => {
  //   try {
  //     const response = await fetch('/api/user-functions')
  //     const data = await response.json()
  //     setFunctions(data)
  //   } catch (error) {
  //     console.error('Error fetching user functions:', error)
  //   }
  // }

  // Commented out API call for updating function status
  // const updateFunctionStatus = async (id, isPublic) => {
  //   try {
  //     await fetch(`/api/update-function-status/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ isPublic }),
  //     })
  //   } catch (error) {
  //     console.error('Error updating function status:', error)
  //   }
  // }

  const handleCreateFunction = useCallback(() => {
    setSelectedFunction({
      id: Date.now(),
      name: "New Function",
      code: "// New function code",
      isPublic: false,
    });
    setShowModal(true);
  }, []);

  const handleFunctionClick = useCallback((func) => {
    setSelectedFunction(func);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedFunction(null);
  }, []);

  useEffect(() => {
    if (selectedFunction) {
      setEditorValue(selectedFunction.code || "");
      setFunctionName(selectedFunction.name || "");
      setIsPublic(selectedFunction.isPublic || false);
    }
  }, [selectedFunction]);

  const handleSaveChanges = () => {
    const updatedFunction = {
      ...selectedFunction,
      name: functionName,
      code: editorValue,
      isPublic: isPublic,
    };
    setFunctions((prevFunctions) => {
      const index = prevFunctions.findIndex((f) => f.id === updatedFunction.id);
      if (index !== -1) {
        const newFunctions = [...prevFunctions];
        newFunctions[index] = updatedFunction;
        return newFunctions;
      } else {
        return [...prevFunctions, updatedFunction];
      }
    });
    handleCloseModal();
  };

  const handleTogglePublic = (id) => {
    setFunctions((prevFunctions) =>
      prevFunctions.map((func) =>
        func.id === id ? { ...func, isPublic: !func.isPublic } : func
      )
    );
    // Commented out API call for updating function status
    // updateFunctionStatus(id, !functions.find(f => f.id === id).isPublic)
  };

  return (
    <div className="bg-[#111827] text-white p-6 rounded-lg min-h-[100vh]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Function Store</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card
          className="bg-blue-600 border-dashed border-2 border-blue-400 cursor-pointer hover:bg-blue-700 transition-colors"
          onClick={handleCreateFunction}
        >
          <CardContent className="flex flex-col items-center justify-center h-full p-6">
            <Plus className="w-8 h-8 mb-2" />
            <span className="text-center">Create New Function</span>
          </CardContent>
        </Card>
        {functions.map((func) => (
          <Card
            key={func.id}
            className="bg-gray-800 cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <CardContent className="flex flex-col items-center justify-between h-full p-6">
              <span className="text-center mb-2">{func.name}</span>
              <div className="flex items-center space-x-2">
                <Switch
                  id={`public-${func.id}`}
                  checked={func.isPublic}
                  onCheckedChange={() => handleTogglePublic(func.id)}
                />
                <Label htmlFor={`public-${func.id}`}>
                  {func.isPublic ? "Public" : "Private"}
                </Label>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFunctionClick(func)}
                className="mt-2"
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>
              <Input
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                placeholder="Function Name"
                className="bg-transparent border-none text-xl font-bold"
              />
            </DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="function-public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
              <Label htmlFor="function-public">
                {isPublic ? "Public" : "Private"}
              </Label>
            </div>
          </div>
          <CodeMirror
            value={editorValue}
            theme={dracula}
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => setEditorValue(value)}
            height="400px"
          />
          <DialogFooter>
            <Button variant="outline" className="text-black" onClick={handleCloseModal}>
              Close
            </Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
