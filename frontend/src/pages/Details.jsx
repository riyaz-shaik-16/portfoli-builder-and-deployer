"use client";

import usePortfolioStore from "@/store/portfolio.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@base-ui/react";
import { useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";
import ImageUploadBox from "@/components/ImageUploadBox";
import { useEffect } from "react";

export default function DetailsForm() {
  const {
    template,
    theme,
    data,
    setPortfolio,
    updatePersonal,
    updateSocialLinks,
    addItem,
    updateItem,
    removeItem,
  } = usePortfolioStore();

  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.get("/portfolio");

        const portfolio = response.data.portfolio;

        if (!portfolio) return;

        const formattedData = { ...portfolio };

        // Format education dates
        formattedData.data.education?.forEach((edu) => {
          if (edu.startDate) edu.startDate = edu.startDate.split("T")[0];
          if (edu.endDate) edu.endDate = edu.endDate.split("T")[0];
        });

        // Format experience dates
        formattedData.data.experience?.forEach((exp) => {
          if (exp.startDate) exp.startDate = exp.startDate.split("T")[0];
          if (exp.endDate) exp.endDate = exp.endDate.split("T")[0];
        });

        // Format certification dates
        formattedData.data.certifications?.forEach((cert) => {
          if (cert.issueDate) cert.issueDate = cert.issueDate.split("T")[0];
        });

        // Format achievement dates
        formattedData.data.achievements?.forEach((ach) => {
          if (ach.date) ach.date = ach.date.split("T")[0];
        });

        setPortfolio(formattedData);
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    fetchPortfolio();
  }, []);

  const handleSubmit = async () => {
    try {
      setPreviewLoading(true);

      console.log("TEMPLATE:", template);
      console.log("THEME:", theme);
      console.log("DATA BEFORE CLEAN:", data);

      const formData = new FormData();

      formData.append("template", template);
      formData.append("theme", JSON.stringify(theme));

      // Deep clone
      const cleanData = JSON.parse(JSON.stringify(data));

      // Keep only existing URL strings, remove File objects
      cleanData.projects?.forEach((p, index) => {
        p.images = (data.projects[index].images || []).filter(
          (img) => typeof img === "string",
        );
      });

      cleanData.certifications?.forEach((c, index) => {
        c.images = (data.certifications[index].images || []).filter(
          (img) => typeof img === "string",
        );
      });

      cleanData.achievements?.forEach((a, index) => {
        a.images = (data.achievements[index].images || []).filter(
          (img) => typeof img === "string",
        );
      });

      formData.append("data", JSON.stringify(cleanData));

      // Attach project images
      data.projects.forEach((project, pIndex) => {
        project.images?.forEach((img) => {
          if (img instanceof File) {
            formData.append(`projectImages-${pIndex}`, img);
          }
        });
      });

      // Attach certification images
      data.certifications.forEach((cert, cIndex) => {
        cert.images?.forEach((img) => {
          if (img instanceof File) {
            formData.append(`certificationImages-${cIndex}`, img);
          }
        });
      });

      // Attach achievement images
      data.achievements.forEach((ach, aIndex) => {
        ach.images?.forEach((img) => {
          if (img instanceof File) {
            formData.append(`achievementImages-${aIndex}`, img);
          }
        });
      });

      const response = await api.post("/portfolio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("RESPONSE:", response.data);
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setPreviewLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* PERSONAL */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Full Name"
            value={data.personal.name}
            onChange={(e) => updatePersonal("name", e.target.value)}
          />
          <Input
            placeholder="Title"
            value={data.personal.title}
            onChange={(e) => updatePersonal("title", e.target.value)}
          />
          <Input
            placeholder="Email"
            value={data.personal.email}
            onChange={(e) => updatePersonal("email", e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={data.personal.phone}
            onChange={(e) => updatePersonal("phone", e.target.value)}
          />
          <Input
            placeholder="Location"
            value={data.personal.location}
            onChange={(e) => updatePersonal("location", e.target.value)}
          />
          <Input
            placeholder="Avatar URL"
            value={data.personal.avatar}
            onChange={(e) => updatePersonal("avatar", e.target.value)}
          />
          <Textarea
            placeholder="Short Bio"
            value={data.personal.bio}
            onChange={(e) => updatePersonal("bio", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* EDUCATION */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className="space-y-3 border p-4 rounded-xl">
              <Input
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) =>
                  updateItem("education", index, {
                    ...edu,
                    institution: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  updateItem("education", index, {
                    ...edu,
                    degree: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Field of Study"
                value={edu.field || ""}
                onChange={(e) =>
                  updateItem("education", index, {
                    ...edu,
                    field: e.target.value,
                  })
                }
              />
              <Input
                type="date"
                value={edu.startDate || ""}
                onChange={(e) =>
                  updateItem("education", index, {
                    ...edu,
                    startDate: e.target.value,
                  })
                }
              />
              <Input
                type="date"
                value={edu.endDate || ""}
                onChange={(e) =>
                  updateItem("education", index, {
                    ...edu,
                    endDate: e.target.value,
                  })
                }
              />
              <Button
                variant="destructive"
                onClick={() => removeItem("education", index)}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            onClick={() =>
              addItem("education", {
                institution: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
              })
            }
          >
            Add Education
          </Button>
        </CardContent>
      </Card>

      {/* PROJECTS */}
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.projects.map((proj, index) => (
            <div key={index} className="space-y-3 border p-4 rounded-xl">
              <Input
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) =>
                  updateItem("projects", index, {
                    ...proj,
                    title: e.target.value,
                  })
                }
              />

              <Textarea
                placeholder="Description"
                value={proj.description}
                onChange={(e) =>
                  updateItem("projects", index, {
                    ...proj,
                    description: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Tech Stack (comma separated)"
                value={proj.techStack?.join(", ") || ""}
                onChange={(e) =>
                  updateItem("projects", index, {
                    ...proj,
                    techStack: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />

              <Input
                placeholder="GitHub Link"
                value={proj.githubLink}
                onChange={(e) =>
                  updateItem("projects", index, {
                    ...proj,
                    githubLink: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Demo Link"
                value={proj.demoLink || ""}
                onChange={(e) =>
                  updateItem("projects", index, {
                    ...proj,
                    demoLink: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Live Link"
                value={proj.liveLink}
                onChange={(e) =>
                  updateItem("projects", index, {
                    ...proj,
                    liveLink: e.target.value,
                  })
                }
              />

              <ImageUploadBox
                images={proj.images || []}
                max={3}
                setImages={(imgs) =>
                  updateItem("projects", index, {
                    ...proj,
                    images: imgs,
                  })
                }
              />

              {(proj.images?.length || 0) < 3 && (
                <Button
                  variant="outline"
                  onClick={() =>
                    updateItem("projects", index, {
                      ...proj,
                      images: [...(proj.images || []), ""],
                    })
                  }
                >
                  Add Image (Max 3)
                </Button>
              )}

              <Button
                variant="destructive"
                onClick={() => removeItem("projects", index)}
              >
                Remove Project
              </Button>
            </div>
          ))}

          <Button
            onClick={() =>
              addItem("projects", {
                title: "",
                description: "",
                techStack: [],
                githubLink: "",
                demoLink: "",
                liveLink: "",
                images: [],
                featured: false,
              })
            }
          >
            Add Project
          </Button>
        </CardContent>
      </Card>

      {/* EXPERIENCE */}
      <Card>
        <CardHeader>
          <CardTitle>Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="space-y-3 border p-4 rounded-xl">
              <Input
                placeholder="Company"
                value={exp.company}
                onChange={(e) =>
                  updateItem("experience", index, {
                    ...exp,
                    company: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Role"
                value={exp.role}
                onChange={(e) =>
                  updateItem("experience", index, {
                    ...exp,
                    role: e.target.value,
                  })
                }
              />
              <Input
                type="date"
                value={exp.startDate || ""}
                onChange={(e) =>
                  updateItem("experience", index, {
                    ...exp,
                    startDate: e.target.value,
                  })
                }
              />
              <Input
                type="date"
                value={exp.endDate || ""}
                onChange={(e) =>
                  updateItem("experience", index, {
                    ...exp,
                    endDate: e.target.value,
                  })
                }
              />
              <Textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) =>
                  updateItem("experience", index, {
                    ...exp,
                    description: e.target.value,
                  })
                }
              />
              <Button
                variant="destructive"
                onClick={() => removeItem("experience", index)}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            onClick={() =>
              addItem("experience", {
                company: "",
                role: "",
                startDate: "",
                endDate: "",
                description: "",
              })
            }
          >
            Add Experience
          </Button>
        </CardContent>
      </Card>

      {/* SKILLS */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.skills.map((skill, index) => (
            <div key={index} className="space-y-3 border p-4 rounded-xl">
              <Input
                placeholder="Skill Name"
                value={skill.name}
                onChange={(e) =>
                  updateItem("skills", index, {
                    ...skill,
                    name: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Category"
                value={skill.category}
                onChange={(e) =>
                  updateItem("skills", index, {
                    ...skill,
                    category: e.target.value,
                  })
                }
              />
              <Input
                type="number"
                placeholder="Level (1-5)"
                value={skill.level}
                onChange={(e) =>
                  updateItem("skills", index, {
                    ...skill,
                    level: Number(e.target.value),
                  })
                }
              />
              <Button
                variant="destructive"
                onClick={() => removeItem("skills", index)}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            onClick={() =>
              addItem("skills", {
                name: "",
                category: "",
                level: 1,
              })
            }
          >
            Add Skill
          </Button>
        </CardContent>
      </Card>

      {/* CERTIFICATIONS */}
      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.certifications.map((cert, index) => (
            <div key={index} className="space-y-3 border p-4 rounded-xl">
              <Input
                placeholder="Certification Name"
                value={cert.name}
                onChange={(e) =>
                  updateItem("certifications", index, {
                    ...cert,
                    name: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Issuer"
                value={cert.issuer}
                onChange={(e) =>
                  updateItem("certifications", index, {
                    ...cert,
                    issuer: e.target.value,
                  })
                }
              />

              <Input
                type="date"
                value={cert.issueDate || ""}
                onChange={(e) =>
                  updateItem("certifications", index, {
                    ...cert,
                    issueDate: e.target.value,
                  })
                }
              />

              {/* IMAGE UPLOAD (MAX 3) */}
              <ImageUploadBox
                images={cert.images || []}
                max={1}
                setImages={(imgs) =>
                  updateItem("certifications", index, {
                    ...cert,
                    images: imgs,
                  })
                }
              />

              <Button
                variant="destructive"
                onClick={() => removeItem("certifications", index)}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            onClick={() =>
              addItem("certifications", {
                name: "",
                issuer: "",
                issueDate: "",
                credentialUrl: "",
                images: [],
              })
            }
          >
            Add Certification
          </Button>
        </CardContent>
      </Card>

      {/* ACHIEVEMENTS */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.achievements.map((ach, index) => (
            <div key={index} className="space-y-3 border p-4 rounded-xl">
              <Input
                placeholder="Title"
                value={ach.title}
                onChange={(e) =>
                  updateItem("achievements", index, {
                    ...ach,
                    title: e.target.value,
                  })
                }
              />

              <Textarea
                placeholder="Description"
                value={ach.description}
                onChange={(e) =>
                  updateItem("achievements", index, {
                    ...ach,
                    description: e.target.value,
                  })
                }
              />

              <Input
                type="date"
                value={ach.date || ""}
                onChange={(e) =>
                  updateItem("achievements", index, {
                    ...ach,
                    date: e.target.value,
                  })
                }
              />

              <ImageUploadBox
                images={ach.images || []}
                max={1}
                setImages={(imgs) =>
                  updateItem("achievements", index, {
                    ...ach,
                    images: imgs,
                  })
                }
              />

              <Button
                variant="destructive"
                onClick={() => removeItem("achievements", index)}
              >
                Remove Achievement
              </Button>
            </div>
          ))}

          <Button
            onClick={() =>
              addItem("achievements", {
                title: "",
                description: "",
                date: "",
                images: [],
              })
            }
          >
            Add Achievement
          </Button>
        </CardContent>
      </Card>

      {/* SOCIAL LINKS */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="GitHub URL"
            value={data.socialLinks.github}
            onChange={(e) => updateSocialLinks("github", e.target.value)}
          />
          <Input
            placeholder="LinkedIn URL"
            value={data.socialLinks.linkedin}
            onChange={(e) => updateSocialLinks("linkedin", e.target.value)}
          />
          <Input
            placeholder="Twitter URL"
            value={data.socialLinks.twitter}
            onChange={(e) => updateSocialLinks("twitter", e.target.value)}
          />
          <Input
            placeholder="Personal Website"
            value={data.socialLinks.website}
            onChange={(e) => updateSocialLinks("website", e.target.value)}
          />
        </CardContent>
      </Card>

      <Separator />
      <Button className="w-full" onClick={handleSubmit}>
        {previewLoading ? "Loading" : "save Details"}
      </Button>
    </div>
  );
}
