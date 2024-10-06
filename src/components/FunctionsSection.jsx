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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

const initialFunctions = [
  {
    id: 1,
    name: "Personal Function 1",
    description: "Description for Personal Function 1",
    code: "// Personal function code",
    isPublic: false,
  },
  {
    id: 2,
    name: "Public Function 1",
    description: "Description for Public Function 1",
    code: "// Public function code",
    isPublic: true,
  },
  {
    id: 3,
    name: "Personal Function 2",
    description: "Description for Personal Function 2",
    code: "// Personal function code",
    isPublic: false,
  },
  {
    id: 4,
    name: "Public Function 2",
    description: "Description for Public Function 2",
    code: "// Public function code",
    isPublic: true,
  },
];

export default function FunctionsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [functions, setFunctions] = useState(initialFunctions);
  const [showModal, setShowModal] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [functionName, setFunctionName] = useState("");
  const [functionDescription, setFunctionDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [editorValue, setEditorValue] = useState("");

  // Commented out API function for fetching functions
  // const fetchFunctions = async () => {
  //   try {
  //     const response = await fetch('/api/functions');
  //     const data = await response.json();
  //     setFunctions(data);
  //   } catch (error) {
  //     console.error('Error fetching functions:', error);
  //   }
  // };

  // Commented out API function for saving a function
  // const saveFunction = async (functionData) => {
  //   try {
  //     const response = await fetch('/api/functions', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(functionData),
  //     });
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error('Error saving function:', error);
  //   }
  // };

  // Commented out API function for updating a function's public status
  // const updateFunctionPublicStatus = async (id, isPublic) => {
  //   try {
  //     const response = await fetch(`/api/functions/${id}/public-status`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ isPublic }),
  //     });
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error('Error updating function public status:', error);
  //   }
  // };

  const handleCreateFunction = useCallback(() => {
    setSelectedFunction({
      id: Date.now(),
      name: "New Function",
      description: "",
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

  const filteredFunctions = functions.filter((func) => {
    if (activeTab === "all") return true;
    return func.isPublic === (activeTab === "public");
  });

  useEffect(() => {
    if (selectedFunction) {
      setEditorValue(selectedFunction.code || "");
      setFunctionName(selectedFunction.name || "");
      setFunctionDescription(selectedFunction.description || "");
      setIsPublic(selectedFunction.isPublic || false);
    }
  }, [selectedFunction]);

  const handleSaveChanges = () => {
    const updatedFunction = {
      ...selectedFunction,
      name: functionName,
      description: functionDescription,
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
    // Commented out API call for saving function
    // saveFunction(updatedFunction);
    handleCloseModal();
  };

  const handleTogglePublic = (id) => {
    setFunctions((prevFunctions) =>
      prevFunctions.map((func) =>
        func.id === id ? { ...func, isPublic: !func.isPublic } : func
      )
    );
    // Commented out API call for updating function public status
    // updateFunctionPublicStatus(id, !functions.find(f => f.id === id).isPublic);
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
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="all" className="text-sm sm:text-base">
              All
            </TabsTrigger>
            <TabsTrigger value="personal" className="text-sm sm:text-base">
              Personal
            </TabsTrigger>
            <TabsTrigger value="public" className="text-sm sm:text-base">
              Public
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card
          className="bg-blue-600 border-dashed border-2 border-blue-400 text-white cursor-pointer hover:bg-blue-700 transition-colors"
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
            className="bg-gray-800 cursor-pointer text-white hover:bg-gray-700 transition-colors"
          >
            <CardContent className="flex flex-col items-center justify-between h-full p-4 sm:p-6">
              <span className="text-center text-sm sm:text-base mb-2">
                {func.name}
              </span>
              <div className="flex items-center space-x-2">
                <Switch
                  id={`public-${func.id}`}
                  checked={func.isPublic}
                  onCheckedChange={() => handleTogglePublic(func.id)}
                />
                <Label htmlFor={`public-${func.id}`} className="text-sm">
                  {func.isPublic ? "Public" : "Private"}
                </Label>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFunctionClick(func)}
                className="mt-2 text-black"
              >
                Open
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-gray-800 text-white  max-w-[90%] mx-auto md:max-w-[70%]">
          <DialogHeader>
            <DialogTitle>Function Details</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="function-name">Name</Label>
                <Input
                  id="function-name"
                  value={functionName}
                  onChange={(e) => setFunctionName(e.target.value)}
                  placeholder="Function Name"
                  className="bg-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="function-description">Description</Label>
                <Textarea
                  id="function-description"
                  value={functionDescription}
                  onChange={(e) => setFunctionDescription(e.target.value)}
                  placeholder="Function Description"
                  className="bg-gray-700 text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="function-public"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
                <Label htmlFor="function-public">Make function public</Label>
              </div>
              <div>
                <Label htmlFor="function-code">Code</Label>
                <div className="h-[200px]">
                  <CodeMirror
                    value={editorValue}
                    theme={dracula}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value) => setEditorValue(value)}
                    height="100%"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="mt-4 flex gap-3" >
            <Button
              variant="outline"
              className="text-black"
              onClick={handleCloseModal}
            >
              Close
            </Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
