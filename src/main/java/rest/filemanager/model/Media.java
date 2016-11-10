package rest.filemanager.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Temporal;

@Entity
public class Media implements Serializable {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String reference;
    private long fileSize;

    @Lob
    private String orginalFileName;

    @Lob
    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date creationDate;

    public Media() {
        
    }

    public Media(String title, String reference, String description, long fileSize, String orginalFileName) {
        this.title = title;
        this.reference = reference;
        this.description = description;
        this.fileSize = fileSize;
        this.orginalFileName = orginalFileName;
        this.creationDate = new Date();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public long getFileSize() {
        return fileSize;
    }

    public void setFileSize(long fileSize) {
        this.fileSize = fileSize;
    }

    public String getOrginalFileName() {
        return orginalFileName;
    }

    public void setOrginalFileName(String orginalFileName) {
        this.orginalFileName = orginalFileName;
    }
}
