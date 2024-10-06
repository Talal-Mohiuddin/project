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
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Textarea } from "@/components/ui/textarea";

const initialFunctions = [
  {
    id: 1,
    name: "Function 1",
    code: "// Function 1 code",
    description: "Description for Function 1",
  },
  {
    id: 2,
    name: "Function 2",
    code: "// Function 2 code",
    description: "Description for Function 2",
  },
  {
    id: 3,
    name: "Function 3",
    code: "// Function 3 code",
    description: "Description for Function 3",
  },
  {
    id: 4,
    name: "Function 4",
    code: "// Function 4 code",
    description: "Description for Function 4",
  },
];

export default function StoreSection() {
  const [functions, setFunctions] = useState(initialFunctions);
  const [showModal, setShowModal] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [functionName, setFunctionName] = useState("");
  const [functionDescription, setFunctionDescription] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateFunction = useCallback(() => {
    setSelectedFunction({
      id: Date.now(),
      name: "New Function",
      code: "// New function code",
      description: "",
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
      setFunctionDescription(selectedFunction.description || "");
    }
  }, [selectedFunction]);

  const handleAddToLibrary = () => {
    // Commented out API call for adding function to library
    // const addToLibrary = async () => {
    //   try {
    //     const response = await fetch('/api/add-to-library', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         name: functionName,
    //         description: functionDescription,
    //         code: editorValue,
    //       }),
    //     });
    //     if (response.ok) {
    //       console.log('Function added to library successfully');
    //     } else {
    //       console.error('Failed to add function to library');
    //     }
    //   } catch (error) {
    //     console.error('Error adding function to library:', error);
    //   }
    // };
    // addToLibrary();
    handleCloseModal();
  };

  const filteredFunctions = functions.filter(
    (func) =>
      func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      func.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#111827] text-white p-6 rounded-lg min-h-[100vh]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold">Function Store</h2>
        <div className="relative w-full md:w-64">
          <Input
            type="text"
            placeholder="Search functions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredFunctions.length === 0 && (
          <div className="col-span-full text-center text-gray-400">
            No functions found
          </div>
        )}
        {filteredFunctions.map((func) => (
          <Card
            key={func.id}
            className="bg-gray-800 cursor-pointer text-white hover:bg-gray-700 transition-colors"
          >
            <CardContent className="flex flex-col items-center justify-between h-full p-6">
              <span className="text-center mb-2">{func.name}</span>
              <p className="text-sm text-gray-400 mb-4 text-center">
                {func.description}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFunctionClick(func)}
                className="mt-2 text-black"
              >
                Show Function
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-gray-800 text-white max-w-[90%] mx-auto md:max-w-[70%]">
          <DialogHeader>
            <DialogTitle>Function Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="function-name">Title</Label>
              <Input
                id="function-name"
                value={functionName}
                placeholder="Function Name"
                className="bg-gray-700 text-white cursor-default"
                editable={false}
              />
            </div>
            <div>
              <Label htmlFor="function-description">Description</Label>
              <Textarea
                id="function-description"
                value={functionDescription}
                editable = {false}
                placeholder="Function Description"
                className="bg-gray-700 text-white cursor-default"
              />
            </div>
            <div>
              <Label>Function Code</Label>
              <CodeMirror
                value={editorValue}
                theme={dracula}
                extensions={[javascript({ jsx: true })]}
                onChange={(value) => setEditorValue(value)}
                height="200px"
                editable={false}
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              className="text-black"
              onClick={handleCloseModal}
            >
              Close
            </Button>
            <Button onClick={handleAddToLibrary}>Add to My Library</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
