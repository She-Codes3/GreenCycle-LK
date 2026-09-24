package lk.greencycle.report.repository;

import lk.greencycle.report.entity.IssueReport;
import lk.greencycle.report.enums.IssueCategory;
import lk.greencycle.report.enums.IssuePriority;
import lk.greencycle.report.enums.IssueStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IssueReportRepository extends JpaRepository<IssueReport, Long> {
    Optional<IssueReport> findByTicketNumber(String ticketNumber);
    Page<IssueReport> findByReporterId(Long reporterId, Pageable pageable);
    List<IssueReport> findByReporterIdOrderByCreatedAtDesc(Long reporterId);
    List<IssueReport> findByStatus(IssueStatus status);
    List<IssueReport> findByCategory(IssueCategory category);
    List<IssueReport> findByPriority(IssuePriority priority);
    List<IssueReport> findByMunicipalityId(Long municipalityId);
    List<IssueReport> findByAssignedOfficerId(Long officerId);
}
