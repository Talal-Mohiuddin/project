"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

const initialFunctions = [
  {
    id: 1,
    name: "Personal Function 1",
    code: "// Personal function code",
    isPublic: false,
  },
  {
    id: 2,
    name: "Public Function 1",
    code: "// Public function code",
    isPublic: true,
  },
  {
    id: 3,
    name: "Personal Function 2",
    code: "// Personal function code",
    isPublic: false,
  },
  {
    id: 4,
    name: "Public Function 2",
    code: "// Public function code",
    isPublic: true,
  },
];

export default function FunctionsSection() {
  const [activeTab, setActiveTab] = useState("personal");
  const [functions, setFunctions] = useState(initialFunctions);
  const [showModal, setShowModal] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [functionName, setFunctionName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [editorValue, setEditorValue] = useState("");

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

  const filteredFunctions = functions.filter(
    (func) => func.isPublic === (activeTab === "public")
  );

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

  return (
    <div className="bg-[#111827] text-white p-5 sm:p-6 rounded-lg min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold">Functions</h2>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-2 sm:w-auto">
            <TabsTrigger value="personal" className="text-sm sm:text-base">
              Personal Library
            </TabsTrigger>
            <TabsTrigger value="public" className="text-sm sm:text-base">
              Public Library
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card
          className="bg-blue-600 border-dashed border-2 border-blue-400  text-white cursor-pointer hover:bg-blue-700 transition-colors"
          onClick={handleCreateFunction}
        >
          <CardContent className="flex flex-col items-center justify-center h-full p-4 sm:p-6">
            <Plus className="w-6 h-6 sm:w-8 sm:h-8 mb-2" />
            <span className="text-center text-sm sm:text-base">
              Create New Function
            </span>
          </CardContent>
        </Card>
        {filteredFunctions.map((func) => (
          <Card
            key={func.id}
            className="bg-gray-800 cursor-pointer  text-white hover:bg-gray-700 transition-colors"
            onClick={() => handleFunctionClick(func)}
          >
            <CardContent className="flex items-center justify-center h-full p-4 sm:p-6">
              <span className="text-center text-sm sm:text-base">
                {func.name}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-gray-800 text-white max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw]">
          <DialogHeader>
            <DialogTitle>
              <Input
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                placeholder="Function Name"
                className="bg-transparent border-none text-lg sm:text-xl font-bold"
              />
            </DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <Checkbox checked={isPublic} onCheckedChange={setIsPublic} />
              <span className="text-sm sm:text-base">Make function public</span>
            </label>
          </div>
          <div className="h-[300px] sm:h-[400px]">
            <CodeMirror
              value={editorValue}
              theme={dracula}
              extensions={[javascript({ jsx: true })]}
              onChange={(value) => setEditorValue(value)}
              height="100%"
            />
          </div>
          <DialogFooter className="flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button
              variant="outline"
              className="text-black w-full sm:w-auto"
              onClick={handleCloseModal}
            >
              Close
            </Button>
            <Button className="w-full sm:w-auto" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
